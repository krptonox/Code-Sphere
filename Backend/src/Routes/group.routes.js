import { Router } from "express";
import { verifyJwt } from "../Middlewares/auth.middleware.js";
import {
    createGroup,
    getGroupMessages,
    getGroups,
    joinGroup,
    sendGroupMessage,
} from "../Controllers/groups.controllers.js";

const router = Router();

router.use(verifyJwt);

router.route("/")
    .get(getGroups)
    .post(createGroup);

router.route("/:groupId/join")
    .post(joinGroup);

router.route("/:groupId/messages")
    .get(getGroupMessages)
    .post(sendGroupMessage);

export default router;
