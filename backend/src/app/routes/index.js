import sendNews from '../../utils/sendNews';
const { Router } = require("express");
const router = Router();

router.get("/", function (req, res) {
  return res.json({
    title: "Bem-vindo a minha API MarketInfo",
    started_date: "31/08/2020",
  });
});

router.post('/api/v1/news', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) return res.status(400).json({ message: 'Preencha o campo de endereço de email.' })

    await sendNews({
      email: email,
      subject: 'MarketInfo | Newsletter'
    });

    return res.status(200).json({
      status: 'success',
      message: 'Uma novidade acabou de ser enviada no seu e-mail verifique sua caixa de entrada ou spam e lixeira.'
    });
  } catch (e) {
    return res.status(404).json({ message: 'Não foi possivel concluir o envio.' })
  }
});

router.use("/api/v1/users", require("./users.routes"));
router.use("/api/v1/auth", require("./auth.routes"));
router.use("/api/v1/account", require("./account.routes"));
router.use("/api/v1/product", require("./product.routes"));
router.use("/api/v1/category", require("./category.routes"));

module.exports = router;
