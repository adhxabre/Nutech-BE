const { product, user } = require('../../models');

exports.addProduct = async (req, res) => {
  try {
    const data = {
      name: req.body.name,
      image: req.file.filename,
      harga: req.body.harga,
      harga_jual: req.body.harga_jual,
      stok: req.body.stok,
      idUser: req.user.id,
    };
    await product.create(data);
    res.send({
      status: 'success',
      message: 'add Product Finish',
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: 'failed',
      message: 'Server Error',
    });
  }
};

exports.getProducts = async (req, res) => {
  try {
    let data = await product.findAll({
      include: [
        {
          model: user,
          as: 'user',
          attributes: {
            exclude: ['createdAt', 'updatedAt', 'password'],
          },
        },
      ],
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'idUser'],
      },
    });
    data = JSON.parse(JSON.stringify(data));
    products = data.map((item) => {
      return { ...item, image: process.env.PATH_FILE + item.image };
    });
    res.status(200).send({
      status: 'success...',
      data: {
        products,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: 'failed',
      message: 'Server Error',
    });
  }
};

exports.getProduct = async (req, res) => {
  try {
    const { id } = req.params;
    let data = await product.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'idUser'],
      },
    });

    data = JSON.parse(JSON.stringify(data));

    data = {
      ...data,
      image: process.env.PATH_FILE + data.image,
    };

    res.status(200).send({
      status: 'success...',
      data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: 'failed',
      message: 'Server Error',
    });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const data = {
      name: req.body.name,
      image: req.file.filename,
      harga: req.body.harga,
      harga_jual: req.body.harga_jual,
      stok: req.body.stok,
      idUser: req.user.id,
    };

    await product.update(data, {
      where: {
        id,
      },
    });
    let productData = await product.findOne({
      where: {
        id,
      },
      include: {
        model: user,
        as: 'user',
        attributes: {
          exclude: ['createdAt', 'updatedAt', 'password'],
        },
      },

      attributes: {
        exclude: ['createdAt', 'updatedAt', 'idUser'],
      },
    });
    productData = JSON.parse(JSON.stringify(productData));

    res.status(200).send({
      status: 'success',
      data: {
        id,
        data,
        image: process.env.PATH_FILE + productData.image,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: 'failed',
      message: 'Server Error',
    });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    await product.destroy({
      where: {
        id,
      },
    });

    res.status(200).send({
      status: 'success',
      data: {
        id,
      },
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: 'failed',
      message: 'Server Error',
    });
  }
};
