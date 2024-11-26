import User from "../../auth/models/User";
import { RequestError } from "../../../shared/middlewares/errorHandler";

export async function deleteRoverHistoryService(userId: string | undefined) {
  const user = await User.findById(userId);
  if (!user) {
    throw new RequestError('User not found.', 404);
  }

  user.roverHistory = [];

  try {
    await user.save();
    return user;
  } catch (error) {
    throw new RequestError('Failed to delete rover history.', 500);
  }
}