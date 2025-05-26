export function generateTxtFileModule(content: string) {
    return "http://localhost:3000/file.txt?content=" + content;
}