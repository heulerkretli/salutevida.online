document.getElementById('domain-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const domainInput = document.getElementById('domain');
    const slugList = document.getElementById('slug-list');

    const domain = domainInput.value;
    
    fetch(`/extract-slugs?url=${encodeURIComponent(domain)}`)
        .then(response => response.json())
        .then(data => {
            slugList.innerHTML = '';

            if (data.slugs && data.slugs.length > 0) {
                data.slugs.forEach(slug => {
                    const slugItem = document.createElement('p');
                    slugItem.textContent = slug;
                    slugList.appendChild(slugItem);
                });
            } else {
                const noSlugsMessage = document.createElement('p');
                noSlugsMessage.textContent = 'Nenhuma slug encontrada.';
                slugList.appendChild(noSlugsMessage);
            }
        })
        .catch(error => {
            console.error('Erro ao extrair slugs:', error);
        });
});
