import TextCountHelper from '../../src/helpers/TextCountHelper';

describe('TextCountHelper', () => {

    describe('calculateReadingTime', () => {

        it('should return "1 min read" when word count is less than 100', () => {
            const wordCount = 99;
            const result = TextCountHelper.calculateReadingTime(wordCount);
            expect(result).toBe('< 1 min read');
        });

        it('should return "1 min read" when word count is less than 200', () => {
            const wordCount = 150;
            const result = TextCountHelper.calculateReadingTime(wordCount);
            expect(result).toBe('~1 min read');
        });

        it('should return "1 min read" when word count is exactly 200', () => {
            const wordCount = 200;
            const result = TextCountHelper.calculateReadingTime(wordCount);
            expect(result).toBe('~1 min read');
        });

        it('should return "2 min read" when word count is between 201 and 400', () => {
            const wordCount = 350;
            const result = TextCountHelper.calculateReadingTime(wordCount);
            expect(result).toBe('~2 min read');
        });

        it('should return "3 min read" when word count is 600', () => {
            const wordCount = 600;
            const result = TextCountHelper.calculateReadingTime(wordCount);
            expect(result).toBe('~3 min read');
        });
    });

    describe('countWords', () => {
        it('should return 0 for an empty string', () => {
            const text = '';
            const result = TextCountHelper.countWords(text);
            expect(result).toBe(0);
        });

        it('should return the correct word count for a simple sentence', () => {
            const text = 'Hello, world!';
            const result = TextCountHelper.countWords(text);
            expect(result).toBe(2);
        });

        it('should correctly count words separated by multiple spaces and line breaks', () => {
            const text = 'Hello,   \nworld! This   is a test.\nNew line here.';
            const result = TextCountHelper.countWords(text);
            expect(result).toBe(9);
        });

        it('should correctly handle text with punctuation', () => {
            const text = 'Hello, world! How are you?';
            const result = TextCountHelper.countWords(text);
            expect(result).toBe(5);
        });

        it('should return 0 for a string with only spaces and punctuation', () => {
            const text = '   , .  ';
            const result = TextCountHelper.countWords(text);
            expect(result).toBe(0);
        });
    });

    describe('takeNumberOfWords', () => {

        it('should return the first 5 words for a given string', () => {
            const text = 'Lorem ipsum dolor sit amet, consectetur adipiscing el aspect, sed do eiusmod tempor incididunt ut lab';
            const result = TextCountHelper.takeNumberOfWords(text, 5);
            expect(result).toBe("Lorem ipsum dolor sit amet");
        });

        test('should return only the first 100 words when input has more than 100 words', () => {
            const input = 'word '.repeat(150).trim(); // Creates a string with 150 "word"
            const result = TextCountHelper.takeNumberOfWords(input, 100);
            const wordCount = result.split(/\s+/).length;
    
            expect(wordCount).toBe(100);
        });
    
        test('should return the entire string when input has exactly 100 words', () => {
            const input = 'word '.repeat(100).trim(); // Creates a string with exactly 100 "word"
            const result = TextCountHelper.takeNumberOfWords(input, 100);
            const wordCount = result.split(/\s+/).length;
    
            expect(wordCount).toBe(100);
            expect(result).toBe(input); // The output should match the input
        });
    
        test('should return the entire string when input has fewer than 100 words', () => {
            const input = 'word '.repeat(50).trim(); // Creates a string with 50 "word"
            const result = TextCountHelper.takeNumberOfWords(input, 100);
            const wordCount = result.split(/\s+/).length;
    
            expect(wordCount).toBe(50);
            expect(result).toBe(input); // The output should match the input
        });
    
        test('should return an empty string when input is empty', () => {
            const input = '';
            const result = TextCountHelper.takeNumberOfWords(input, 100);
    
            expect(result).toBe('');
        });
    
        test('should return the single word when input has exactly 1 word', () => {
            const input = 'hello';
            const result = TextCountHelper.takeNumberOfWords(input, 100);
    
            expect(result).toBe('hello');
        });
    });
});
