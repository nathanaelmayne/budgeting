export interface LineChartPoint<T> {
    label: string;
    showTooltip: boolean;
    x: number;
    y: number;
    data?: T;
}