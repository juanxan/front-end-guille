export const navbarData = [
    {
        routeLink:'/admin/home',
        icon: 'fa-house',
        label: 'Inicio',
        rol: ['']
    },
    {
        routeLink:'productos',
        icon: 'fa-clipboard-list',
        label: 'Productos',
        rol: ['CONTROL-INVENTARIOS','SUPER USUARIO'],
    },
    {
        routeLink:'categorias',
        icon: 'fa-truck-fast',
        label: 'Categorías',
        rol: ['ADMINISTRADOR', 'ADMINISTRADOR SUPLENTE','SUPER USUARIO','GERENTE', 'SUPER USUARIO OV'],
    },
    {
        routeLink:'pedidos',
        icon: 'fa-gift',
        label: 'Pedidos',
        rol: ['SUPER USUARIO','GERENTE','ADMINISTRADOR', 'ADMINISTRADOR SUPLENTE', 'SUPER USUARIO OV'],
    }
];
