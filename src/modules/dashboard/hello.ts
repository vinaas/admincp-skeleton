export class SecretMessageCustomElement {
    secretMessage = 'Be sure to drink your Ovaltine!';
    bind(ct) {
        console.log('secret', ct);
    }
}