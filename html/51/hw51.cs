using System.Net.Http.Headers;
using System.Xml.Serialization;

namespace Practice1
{
    internal class Program 
    {
        static void Main(string[] args)
        {
            string[] colors = {"red", "green", "blue" };
            string[] patterns = { "striped", "checked", "plain" };
            
            

            for(int i = 0; i < colors.Length; i++)
            {
                
                for (int j = 0; j < patterns.Length; j++)
                {
                    shirt s1 = new shirt(colors[i], patterns[j]);                    
                    s1.GetShirt();
                }
                
            }                      
        }
        public class shirt
        {
            public string Color { get; set; }
            public string Pattern { get; set; }
            public shirt(string color, string pattern)
            {
                Color = color;
                Pattern = pattern;
            }
            public void GetShirt()
            {
                Console.WriteLine($"Color: {Color}, Pattern {Pattern}");
            }
            
        }
        
            

    }
}