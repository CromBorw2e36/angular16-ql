export default class ObjectExtension {
    static copyProperties(source: any, destination: any): void {
        const sourceProperties = Object.keys(source);
        const destinationProperties = Object.keys(destination);

        for (const sourceProperty of sourceProperties) {
            const destinationProperty = destinationProperties.find(p => p === sourceProperty);
            if (destinationProperty !== undefined) {
                (destination as any)[destinationProperty] = (source as any)[sourceProperty];
            }
        }
    }
}