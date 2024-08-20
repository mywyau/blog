class TextCountService {
    
    // Method to calculate reading time based on word count
    calculateReadingTime(wordCount: number): string {
        const wordsPerMinute = 200;
        const minutes = Math.ceil(wordCount / wordsPerMinute);
        const message = minutes < 1 ? `< 1 min read` : `${minutes} min read`;
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
}

// Example usage:

