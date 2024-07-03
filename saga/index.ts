import { fork, all } from "redux-saga/effects";

import { userWatcher } from "./userSaga";
import { userCartWatcher } from "./userCartSaga";

export default function* rootSaga(): any {
    yield all([
        yield fork(userWatcher),
        yield fork(userCartWatcher)
    ]);
}
