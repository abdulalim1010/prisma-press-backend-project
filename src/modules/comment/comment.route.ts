import { Router } from "express";
import { commentController } from "./comment.controller";
import { auth } from "../../middleware/auth";
import { Role } from "../../../generated/prisma/enums";

const router = Router();

router.get("/author/:authorId", commentController.getCommentsByAuthor);

router.get("/:commentId", commentController.getSingleComment);

router.post(
  "/",
  auth(Role.ADMIN, Role.USER),
  commentController.createComment
);

router.patch(
  "/:commentId",
  auth(Role.ADMIN, Role.USER),
  commentController.updateComment
);

router.delete(
  "/:commentId",
  auth(Role.ADMIN, Role.USER),
  commentController.deleteComment
);

router.patch(
  "/:commentId/moderate",
  auth(Role.ADMIN),
  commentController.moderateComment
);

export const commentRouter = router;