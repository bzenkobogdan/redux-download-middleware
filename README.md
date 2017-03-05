# redux-download-middleware
Redux download file middleware

Example: 


//import download symbol
```
import {DOWNLOAD_FILE} from '/middleware/redux-download-middleware';
```

//action types
```
const ActionTypes = {
    DOWNLOAD_SOME_FILE_REQUEST: 'DOWNLOAD_SOME_FILE_REQUEST',
    DOWNLOAD_SOME_FILE_REQUEST: 'DOWNLOAD_SOME_FILE_SUCCESS',
    DOWNLOAD_SOME_FILE_REQUEST: 'DOWNLOAD_SOME_FILE_FAILURE'
}
```
//action
```
const downloadSomeFile = () => dispatch => {
    return dispatch({
        [DOWNLOAD_FILE]: {
            types: [
                ActionTypes.DOWNLOAD_SOME_FILE_REQUEST,
                ActionTypes.DOWNLOAD_SOME_FILE_SUCCESS,
                ActionTypes.DOWNLOAD_SOME_FILE_FAILURE
            ],
            endpoint: 'http://someurl.com'
        }
    });
};
```
//reducer
```
const downloadFile = (state = {}, {type}) => {
    if (type === ActionTypes.DOWNLOAD_SOME_FILE_SUCCESS) {
        return {
            loaded: true
        };
    }
    
    if (type === ActionTypes.DOWNLOAD_SOME_FILE_FAILURE) {
        return {
            loaded: false
        };
    }
}
```
