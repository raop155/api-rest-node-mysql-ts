"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("./../controllers/user");
const express_1 = require("express");
const router = express_1.Router();
router.get("/", user_1.getUsers);
router.get("/:id", user_1.getUser);
router.post("/", user_1.postUser);
router.put("/:id", user_1.putUser);
router.delete("/:id", user_1.deleteUser);
exports.default = router;
//# sourceMappingURL=user.js.map