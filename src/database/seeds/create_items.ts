import Knex from 'knex';

export async function seed(knex: Knex){
    await knex('items').insert([
        { title: 'Lâmpadas', image: 'lampadas.svg', id:1 },
        { title: 'Pilhas e baterias', image: 'baterias.svg', id:2 },
        { title: 'Papéis e Papelão', image: 'papeis-papelao.svg', id:3 },
        { title: 'Resíduos e Eletrônicos', image: 'eletronicos.svg', id:4 },
        { title: 'Resíduos Orgânicos', image: 'organicos.svg', id:5 },
        { title: 'Óleo de cozinha', image: 'oleo.svg', id:6 },
    ]);
};