export interface Purchase {
    id: string;
    product_type_id: string;
    currency: 'INR' | 'USD';
    remark: string;
}
