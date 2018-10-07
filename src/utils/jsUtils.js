const {URLSearchParams} = window;

export let extractData = (res) => {
    return res.data;
};

export let toSearchParams = ((requestData = {}) => {
    let params = new URLSearchParams();
    Object.keys(requestData).map(key => {
        params.set(key, requestData[key]);
    });
    return params;
});
