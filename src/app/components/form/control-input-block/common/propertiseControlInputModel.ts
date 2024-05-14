class PropertiesControlInputModel<T> {
    data: T;

    constructor() {
        this.data = {} as any;
    }
 
    getData(): T {
        return this.data;
    }

    setData(data: T): void {
        this.data = data;
    }

    setDataColumn<K extends keyof T>(dataField: K, data: T[K]): void {
        try {
            if (dataField in (this.data as any)) {
                (this.data as any)[dataField] = data;
            }
        } catch (e) {
            console.error('An error occurred while setting data column:', e);
        }
    }
}

export default PropertiesControlInputModel;