

class TextCountHelper {

    // Method to calculate reading time based on word count
    calculateReadingTime(wordCount: number): string {
        const wordsPerMinute = 200;
        const minutes = Math.round(wordCount / wordsPerMinute);

        function getTimeMessage(minutes: number): string {
            if (minutes < 1) {
                return `< 1 minute`;
            } else if (minutes == 1) {
                return `1 minute`;
            } else {
                return `~${minutes} minutes`;
            }
        }

        const message = getTimeMessage(minutes);
        return message;
    }

    // Method to count words in a given text
    countWords(text: string): number {
        return text
            ? text
                .trim()
                .replace(/(\r\n|\n|\r)/gm, "")
                .split(/[.,\s]+/) // Split by spaces, commas, or periods
                .filter(word => word.length > 0) // Filter out any empty strings
                .length
            : 0;
    }

    takeNumberOfWords(text: string, desiredNumberOfWords: number): string {
        return text
            ? text
                .trim()
                .split(/[.,\s]+/) // Split by spaces, commas, or periods
                .slice(0, desiredNumberOfWords)              // Take the first 100 words
                .join(' ')                  // Join the words back into a string with spaces
            : "";
    }
}

export default new TextCountHelper();


