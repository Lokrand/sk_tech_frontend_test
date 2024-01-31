import { all, takeEvery, put, delay, call, take } from "typed-redux-saga";
import { mainActions } from "../actions";
import { MainApi } from "../api";

export function* mainMessagesList(): Generator<any, void, any> {
  try {
    const channel = yield call(MainApi.getMessagesList);
    // yield delay(2000);
    while (true) {
      const data = yield take(channel);
      console.log("mainMessagesList", data);
      yield put(mainActions.mainMessagesListSuccess(data));
    }
  } catch (error) {
    yield put(mainActions.mainMessagesListFailed(error));
    console.error("loading error", error);
  }
}

export function* watchMainMessagesList(): Generator<any, void, any> {
  yield takeEvery(mainActions.MAIN_MESSAGES_LIST_FETCH, mainMessagesList);
}

export default function* rootSaga(): Generator<any, void, any> {
  yield all([watchMainMessagesList()]);
}
