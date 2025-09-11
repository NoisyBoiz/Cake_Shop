import Categories from '../Models/Categories.js';

const CategoryService = {
    getAllCategory: () => {
        return Categories.findAll();
    },
    existById: async (id) => {
        const category = await Categories.findByPk(id);
        return category != null;
    },
    getCategoryById: (id) => {
        return Categories.findByPk(id);
    },
    createCategory: (data) => {
        return Categories.create(data);
    },
    updateCategory: (data) => {
        return Categories.update({"category":data.category}, {where: {id_category: data.id}});
    },
    deleteCategory: (id) => {
        return Categories.destroy({where: {id_category: id}});
    }
};

export default CategoryService;