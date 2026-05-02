import { Routes } from '@angular/router';
import { ProductDetails } from './shared/components/product-details/product-details';
import { ProductList } from './shared/components/product-list/product-list';
import { ProductForm } from './shared/components/product-form/product-form';

export const routes: Routes = [
    {
        path: "",
        component: ProductList
    },
    {
        path: "details/:name",
        component: ProductDetails
    },
    {
        path: "productform",
        component: ProductForm
    }

];
