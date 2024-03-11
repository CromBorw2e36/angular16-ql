export interface IInputIconModule{
    position: 'before' | 'after';
    name: string;
    options?: {
        class?: string;
        click: () => void;
    }
}