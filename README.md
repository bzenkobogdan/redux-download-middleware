# redux-download-middleware
Redux download file middleware

Example: 


//import download symbol
```javascript
import {DOWNLOAD_FILE} from '/middleware/redux-download-middleware';
```

//action types
```javascript
const ActionTypes = {
    DOWNLOAD_SOME_FILE_REQUEST: 'DOWNLOAD_SOME_FILE_REQUEST',
    DOWNLOAD_SOME_FILE_SUCCESS: 'DOWNLOAD_SOME_FILE_SUCCESS',
    DOWNLOAD_SOME_FILE_FAILURE: 'DOWNLOAD_SOME_FILE_FAILURE'
}
```
//action
```javascript
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
```javascript
const downloadFile = (state = {}, {type}) => {
    if (type === ActionTypes.DOWNLOAD_SOME_FILE_SUCCESS) {
        return {
            ...state,
            loaded: true
        };
    }
    
    if (type === ActionTypes.DOWNLOAD_SOME_FILE_FAILURE) {
        return {
            ...state,
            loaded: false
        };
    }
}
```
