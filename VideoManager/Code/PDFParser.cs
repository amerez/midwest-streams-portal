using System;
using System.IO;
using iTextSharp.text.pdf;
using System.Text;
using VideoManager.Models;
using VideoManager.Models.Data;
using iTextSharp.text.pdf.parser;
using System.Text.RegularExpressions;

namespace PdfToText
{
    /// <summary>
    /// Parses a PDF file and extracts the text from it.
    /// </summary>
    public class PDFParser
    {
        private ApplicationDbContext db = new ApplicationDbContext();

        /// BT = Beginning of a text object operator 
        /// ET = End of a text object operator
        /// Td move to the start of next line
        ///  5 Ts = superscript
        /// -5 Ts = subscript

        #region Fields

        #region _numberOfCharsToKeep
        /// <summary>
        /// The number of characters to keep, when extracting text.
        /// </summary>
        private static int _numberOfCharsToKeep = 15;
        #endregion

        #endregion

        #region ExtractText
        /// <summary>
        /// Extracts a text from a PDF file.
        /// </summary>
        /// <param name="inFileName">the full path to the pdf file.</param>
        /// <param name="outFileName">the output file name.</param>
        /// <returns>the extracted text</returns>
        public string ExtractText(int serviceId, string inFileName)
        {
            if(!File.Exists(inFileName))
            {
                return "false";
            }
            var text = new StringBuilder();

            // The PdfReader object implements IDisposable.Dispose, so you can
            // wrap it in the using keyword to automatically dispose of it
            using (var pdfReader = new PdfReader(inFileName))
            {
                // Loop through each page of the document
                for (var page = 1; page <= pdfReader.NumberOfPages; page++)
                {
                    ITextExtractionStrategy strategy = new SimpleTextExtractionStrategy();

                    var currentText = PdfTextExtractor.GetTextFromPage(
                        pdfReader,
                        page,
                        strategy);

                    currentText =
                        Encoding.UTF8.GetString(Encoding.Convert(
                            Encoding.Default,
                            Encoding.UTF8,
                            Encoding.Default.GetBytes(currentText)));

                    text.Append(currentText);
                }
            }
            //end
            /*
            //StreamWriter outFile = null;
            try
            {
                // Create a reader for the given PDF file
                PdfReader reader = new PdfReader(inFileName);
                //outFile = File.CreateText(outFileName);
               // outFile = new StreamWriter(outFileName, false, System.Text.Encoding.UTF8);
                StringBuilder pdfText = new StringBuilder();
                Console.Write("Processing: ");
                
                int     totalLen    = 68;
                float   charUnit    = ((float)totalLen) / (float)reader.NumberOfPages;
                int     totalWritten= 0;
                float   curUnit     = 0;

                for (int page = 1; page <= reader.NumberOfPages; page++)
                {                    
                    //outFile.Write(ExtractTextFromPDFBytes(reader.GetPageContent(page)) + " ");
                    pdfText.Append(ExtractTextFromPDFBytes(reader.GetPageContent(page)) + " ");
                    // Write the progress.
                    if (charUnit >= 1.0f)
                    {
                        for (int i = 0; i < (int)charUnit; i++)
                        {
                            Console.Write("#");
                            totalWritten++;
                        }
                    }
                    else
                    {
                        curUnit += charUnit;
                        if (curUnit >= 1.0f)
                        {
                            for (int i = 0; i < (int)curUnit; i++)
                            {
                                Console.Write("#");
                                totalWritten++;
                            }
                            curUnit = 0;
                        }
                        
                    }
                }

                if (totalWritten < totalLen)
                {
                    for (int i = 0; i < (totalLen - totalWritten); i++)
                    {
                        Console.Write("#");
                    }
                }
                */
            // get the service 
            // need to pass in the service number somehow 
            Service service = new Service();
            service = db.Services.Find(serviceId);

            // get the first and last name of the person from the service
            string fname = service.FirstName;
            string lname = service.LastName;

            // convert pdftext to a string  
            string pdftext = text.ToString();

            while (pdftext.Contains("\n") || pdftext.Contains("\\"))
            {
                pdftext = pdftext.Replace("\n", " ");
                pdftext = pdftext.Replace("\\", " ");
            }

            // gets the index of the first occurence of the firstname -1 means it wasn't found
            // need to check this 
            int fnameIndex = pdftext.IndexOf(fname);

            string firstNameMinusFirstLetter = fname.Substring(1);

            if (pdftext.Contains(" " + firstNameMinusFirstLetter))
            {
                fnameIndex = pdftext.IndexOf(" " + firstNameMinusFirstLetter);
                if (fnameIndex > 1)
                {

                    pdftext = fname + " " + pdftext.Substring(fnameIndex + fname.Length + 1);
                }
            }
            else if (pdftext.Contains("Remembering the Life"))
            {
                pdftext = pdftext.Substring(pdftext.IndexOf("Remembering the Life"));
            }

            fnameIndex = pdftext.IndexOf(fname);
            int count = 0;
            int commaCount = 0;
            if (fnameIndex != -1)
            {
                for (int i = fnameIndex; i < pdftext.Length; i++)
                {
                    count += 1;
                    if (pdftext[i] == '.')
                    {
                        commaCount += 1;
                        if (commaCount == 3)
                        {
                            break;
                        }
                    }

                }
           
                string firstSentence = pdftext.Substring(fnameIndex, count);

                firstSentence = Regex.Replace(firstSentence, @"\s+", " "); ;

                firstSentence += "..";
                return firstSentence;
            }
            return "false";
        }
        /*
            catch
            {
                return "error";
            }
         
        }
        #endregion

        #region ExtractTextFromPDFBytes
        /// <summary>
        /// This method processes an uncompressed Adobe (text) object 
        /// and extracts text.
        /// </summary>
        /// <param name="input">uncompressed</param>
        /// <returns></returns>
        private string ExtractTextFromPDFBytes(byte[] input)
        {

            if (input == null || input.Length == 0) return "";

            try
            {
                string resultString = "";

                // Flag showing if we are we currently inside a text object
                bool inTextObject = false;

                // Flag showing if the next character is literal 
                // e.g. '\\' to get a '\' character or '\(' to get '('
                bool nextLiteral = false;

                // () Bracket nesting level. Text appears inside ()
                int bracketDepth = 0;

                // Keep previous chars to get extract numbers etc.:
                char[] previousCharacters = new char[_numberOfCharsToKeep];
                for (int j = 0; j < _numberOfCharsToKeep; j++) previousCharacters[j] = ' ';


                for (int i = 0; i < input.Length; i++)
                {
                    char c = (char)input[i];

                    if (inTextObject)
                    {
                        // Position the text
                        if (bracketDepth == 0)
                        {
                            if (CheckToken(new string[] { "TD", "Td" }, previousCharacters))
                            {
                                resultString += "\n\r";
                            }
                            else
                            {
                                if (CheckToken(new string[] {"'", "T*", "\""}, previousCharacters))
                                {
                                    resultString += "\n";
                                }
                                else
                                {
                                    if (CheckToken(new string[] { "Tj" }, previousCharacters))
                                    {
                                        resultString += " ";
                                    }
                                }
                            }
                        }

                        // End of a text object, also go to a new line.
                        if (bracketDepth == 0 && 
                            CheckToken( new string[]{"ET"}, previousCharacters))
                        {

                            inTextObject = false;
                            resultString += " ";
                        }
                        else
                        {
                            // Start outputting text
                            if ((c == '(') && (bracketDepth == 0) && (!nextLiteral))
                            {
                                bracketDepth = 1;
                            }
                            else
                            {
                                // Stop outputting text
                                if ((c == ')') && (bracketDepth == 1) && (!nextLiteral))
                                {
                                    bracketDepth = 0;
                                }
                                else
                                {
                                    // Just a normal text character:
                                    if (bracketDepth == 1)
                                    {
                                        // Only print out next character no matter what. 
                                        // Do not interpret.
                                        if (c == '\\' && !nextLiteral)
                                        {
                                            nextLiteral = true;
                                        }
                                        else
                                        {
                                            if (((c >= ' ') && (c <= '~')) ||
                                                ((c >= 128) && (c < 255)))
                                            {
                                                resultString += c.ToString();
                                            }

                                            nextLiteral = false;
                                        }
                                    }
                                }
                            }
                        }
                    }

                    // Store the recent characters for 
                    // when we have to go back for a checking
                    for (int j = 0; j < _numberOfCharsToKeep - 1; j++)
                    {
                        previousCharacters[j] = previousCharacters[j + 1];
                    }
                    previousCharacters[_numberOfCharsToKeep - 1] = c;

                    // Start of a text object
                    if (!inTextObject && CheckToken(new string[]{"BT"}, previousCharacters))
                    {
                        inTextObject = true;
                    }
                }
                return resultString;
            }
            catch
            {
                return "";
            }
        }
        #endregion

        #region CheckToken
        /// <summary>
        /// Check if a certain 2 character token just came along (e.g. BT)
        /// </summary>
        /// <param name="search">the searched token</param>
        /// <param name="recent">the recent character array</param>
        /// <returns></returns>
        private bool CheckToken(string[] tokens, char[] recent)
        {
            foreach (string token in tokens)
            {
                if (token.Length > 1)
                {
                    if ((recent[_numberOfCharsToKeep - 3] == token[0]) &&
                        (recent[_numberOfCharsToKeep - 2] == token[1]) &&
                        ((recent[_numberOfCharsToKeep - 1] == ' ') ||
                        (recent[_numberOfCharsToKeep - 1] == 0x0d) ||
                        (recent[_numberOfCharsToKeep - 1] == 0x0a)) &&
                        ((recent[_numberOfCharsToKeep - 4] == ' ') ||
                        (recent[_numberOfCharsToKeep - 4] == 0x0d) ||
                        (recent[_numberOfCharsToKeep - 4] == 0x0a))
                        )
                    {
                        return true;
                    }
                }
                else
                {
                    if ((recent[_numberOfCharsToKeep - 2] == token[0]) &&
                        ((recent[_numberOfCharsToKeep - 1] == ' ') ||
                        (recent[_numberOfCharsToKeep - 1] == 0x0d) ||
                        (recent[_numberOfCharsToKeep - 1] == 0x0a)) &&
                        ((recent[_numberOfCharsToKeep - 4] == ' ') ||
                        (recent[_numberOfCharsToKeep - 4] == 0x0d) ||
                        (recent[_numberOfCharsToKeep - 4] == 0x0a))
                        )
                    {
                        return true;
                    }
                }
            }
            return false;
        }
        #endregion
    }
         
}
*/
    }
    #endregion
}