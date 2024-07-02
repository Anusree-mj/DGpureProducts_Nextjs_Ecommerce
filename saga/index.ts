import { fork, all } from "redux-saga/effects";

import { userWatcher } from "./userSaga";

export default function* rootSaga(): any {
    yield all([
        yield fork(userWatcher),
    ]);
}
