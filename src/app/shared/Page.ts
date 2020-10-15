export class Page<T> {
    content: T[];
    totalPages: number;
    number: number;
    size: number;
    last: boolean;
}