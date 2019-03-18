//------------------------------------------------------------------------------
// Configuración de handlebars.
//------------------------------------------------------------------------------
//=require ../../node_modules/handlebars/dist/handlebars.js
Handlebars.registerHelper('json', value => JSON.stringify(value));
Handlebars.registerHelper('equals', (value1, value2) => value1 == value2);
//------------------------------------------------------------------------------
/**
 * Renderiza una plantilla y la asigna como contenido al elemento especificado.
 *
 * @param {string} tpl     ID del nodo con el contenido de la plantilla.
 * @param {string} content ID del nodo que recibirá el resultado de renderizar la plantilla.
 * @param {object} context Contexto a usar para renderizar la plantilla.
 */
function render(tpl = 'hbs-template', content = 'content', context = {})
{
    let _content;
    const node = document.getElementById(tpl);
    if (node)
    {
        const template = node.innerText;
        if (template)
        {
            _content = document.getElementById(content);
            if (_content)
            {
                _content.innerHTML = Handlebars.compile(template)(context || {});
            }
        }
    }

    return _content && _content.firstChild;
}
