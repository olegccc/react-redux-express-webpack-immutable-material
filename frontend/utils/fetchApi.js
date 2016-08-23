class FetchApi {

    static fetch(url, payload, method, options) {

        let newOptions = Object.assign({}, options, {
            method: method,
            headers: Object.assign({}, (options && options.headers) || {}, {
                accept: 'application/json'
            })
        });

        url = '/api/' + url;

        if (payload) {
            newOptions.body = JSON.stringify(payload);
            newOptions.headers['Content-Type']  = 'application/json';
        }

        return fetch(url, newOptions).then(function(response) {
            if (response.status !== 200) {
                return Promise.reject(response.statusText);
            }
            return response.json();
        });
    }

    static read(url, options) {
        return this.fetch(url, null, 'GET', options);
    }

    static create(url, payload, options) {
        return this.fetch(url, payload, 'POST', options);
    }

    static update(url, payload, options) {
        return this.fetch(url, payload, 'PUT', options);
    }

    static remove(url, payload, options) {
        return this.fetch(url, payload, 'DELETE', options);
    }
}

export default FetchApi;