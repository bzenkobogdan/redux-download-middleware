export const DOWNLOAD_FILE = Symbol('Download File');

const validateAction = (action) => {
    const {types, endpoint} = action[DOWNLOAD_FILE];

    if (typeof endpoint !== 'string') {
        throw new Error('Specify a string endpoint URL.');
    }
    if (!Array.isArray(types) || types.length !== 3) {
        throw new Error('Expected an array of three action types.');
    }
    if (!types.every(type => typeof type === 'string')) {
        throw new Error('Expected action types to be strings.');
    }
};

const actionWith = (action, data) => {
    const finalAction = {...action, ...data};
    delete finalAction[DOWNLOAD_FILE];
    return finalAction;
};


const appendElementInDOM = (el, node) => {
    const container = node || document.body;
    container.appendChild(el);
};

const createElement = (elType, props) => {
    const el = document.createElement(elType);
    return Object.assign(el, props);
};

const download = (info, cb) => {
    const {types, endpoint} = info;
    const [requestType, successType, failureType] = types;
    
    const iframe = createElement('iframe', {src: endpoint});
    const script = createElement('script', {src: endpoint});

    appendElementInDOM(iframe);
    appendElementInDOM(script, iframe);
    
    script.onload = () => {
        if (iframe.contentDocument.title) {
            return script.onerror();
        }

        iframe.remove();
        cb(successType);
    }

    script.onerror = () => {
        iframe.remove();
        cb(failureType);
    }
};

export default store => next => action => {
    const downloadInfo = action[DOWNLOAD_FILE];

    if (!downloadInfo) {
        return next(action);
    }

    const [requestType, successType, failureType] = downloadInfo.types;
    
    validateAction(action);
    next(actionWith(action, {type: requestType}));

    return download(downloadInfo, (type) => {
        next(actionWith({
            type: type
        }));
    });
};