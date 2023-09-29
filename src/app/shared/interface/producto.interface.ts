export interface Producto{
    idproducto: string;
    nombre: string;
    image: string;
    precio: number;
    description: string;
    categoria_idcategoria: Categoria;
}

export interface Categoria{
    idcategoria:string;
    nombre:string;
    descripcion:string;
}

export interface ProductoSave extends Producto{
    cantidad: number;
}