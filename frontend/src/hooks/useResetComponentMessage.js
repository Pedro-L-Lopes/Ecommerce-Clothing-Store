// Redux
import { resetMessage } from "../slices/photoSlice";

export const resetComponentMessage = (dispatch) => {
  return () => {
    setTimeout(() => {
      dispatch(resetMessage());
    }, 2000);
  };
};
