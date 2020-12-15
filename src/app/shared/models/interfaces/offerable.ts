import { Enterprise } from "../offer.model";
export interface Offerable {
    id?: any;
    title: string;
    enterprise: Enterprise;
    candidates: string[];
    description: string;
    ubication: string;
    date: string;
    employments: number;
}
