const router = require("express").Router();
// const apiRoutes = require("./homeRoutes");
const apiRoutes = require("./api");

// router.use("/", apiRoutes);
router.use("/api", apiRoutes);

router.use((req, res) => res.send("Wrong route!"));

module.exports = router;
