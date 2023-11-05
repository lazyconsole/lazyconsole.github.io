

window.addEventListener('NEOLine.N3.EVENT.READY', () => {
    const neolineN3 = new NEOLineN3.Init();
    document.getElementById("read").onclick = async () => {
        try {
            const { value } = document.getElementById("exec")
            const url = new URL(value)
            if (url.protocol !== "n3:") throw 'protocol must be n3!';
            const [_0, _1, sender, _3, scopes, scripthash, method] = url.pathname.match(new RegExp('^//(([a-zA-Z0-9]+)(:(.*))?@)?([a-zA-Z0-9]+)/([a-zA-Z0-9]+)$'));
            const ret = await neolineN3.invokeRead({
                scriptHash: scripthash,
                operation: method,
                args: [...url.searchParams].map(([k, v]) => ({ type: k, value: v })),
                signers: [{ account: sender ?? (await neolineN3.getAccount()).address, scopes: scopes ? parseInt(scopes) : 1 }],
            });
            alert(JSON.stringify(ret));
        } catch (err) {
            console.log(err);
            alert(JSON.stringify(err));
        }
    }
    document.getElementById("write").onclick = async () => {
        try {
            const { value } = document.getElementById("exec")
            const url = new URL(value)
            if (url.protocol !== "n3:") throw 'protocol must be n3!';
            const [_0, _1, sender, _3, scopes, scripthash, method] = url.pathname.match(new RegExp('^//(([a-zA-Z0-9]+)(:(.*))?@)?([a-zA-Z0-9]+)/([a-zA-Z0-9]+)$'));
            const ret = await neolineN3.invoke({
                scriptHash: scripthash,
                operation: method,
                args: [...url.searchParams].map(([k, v]) => ({ type: k, value: v })),
                signers: [{ account: sender ?? (await neolineN3.getAccount()).address, scopes: scopes ? parseInt(scopes) : 1 }],
            });
            alert(JSON.stringify(ret));
        } catch (err) {
            console.log(err);
            alert(JSON.stringify(err));
        }
    }
});
