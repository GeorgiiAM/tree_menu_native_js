// Функция для имитации получения данных через REST API
async function getData() {
    return {
        "services": [{
                "id": 1,
                "head": null,
                "name": "Проф.осмотр",
                "node": 0,
                "price": 100.0,
                "sorthead": 20
            },
            {
                "id": 2,
                "head": null,
                "name": "Хирургия",
                "node": 1,
                "price": 0.0,
                "sorthead": 10
            },
            {
                "id": 3,
                "head": 2,
                "name": "Удаление зубов",
                "node": 1,
                "price": 0.0,
                "sorthead": 10
            },
            {
                "id": 4,
                "head": 3,
                "name": "Удаление зуба",
                "node": 0,
                "price": 800.0,
                "sorthead": 10
            },
            {
                "id": 5,
                "head": 3,
                "name": "Удаление 8ого зуба",
                "node": 0,
                "price": 1000.0,
                "sorthead": 30
            },
            {
                "id": 6,
                "head": 3,
                "name": "Удаление осколка зуба",
                "node": 0,
                "price": 2000.0,
                "sorthead": 20
            },
            {
                "id": 7,
                "head": 2,
                "name": "Хирургические вмешательство",
                "node": 0,
                "price": 200.0,
                "sorthead": 10
            },
            {
                "id": 8,
                "head": 2,
                "name": "Имплантация зубов",
                "node": 1,
                "price": 0.0,
                "sorthead": 20
            },
            {
                "id": 9,
                "head": 8,
                "name": "Коронка",
                "node": 0,
                "price": 3000.0,
                "sorthead": 10
            },
            {
                "id": 10,
                "head": 8,
                "name": "Слепок челюсти",
                "node": 0,
                "price": 500.0,
                "sorthead": 20
            }
        ]
    };
}


// Функция для построения дерева
function buildTree(data) {
    // Создаем корневой элемент дерева
    const rootNode = document.createElement('div');
    rootNode.className = 'menu_el';

    // Функция для рекурсивного создания элементов дерева
    function createTreeElements(parentId, parentNode) {
        // Получаем все элементы с родительским идентификатором parentId
        const children = data.filter((item) => item.head === parentId);

        // Сортируем элементы по порядку sorthead
        children.sort((a, b) => a.sorthead - b.sorthead);

        // Создаем элементы для каждого дочернего элемента
        children.forEach((child) => {
            // Создаем элемент списка
            const listItem = document.createElement('div');
            listItem.className = 'menu_el';

            // Создаем элемент заголовка
            const titleElement = document.createElement('span');
            titleElement.textContent = child.name;
            listItem.appendChild(titleElement);

            // Если узел является узлом дерева, то рекурсивно создаем дочерние элементы
            if (child.node === 1) {
                // Создаем блок со значком для сворачивания/разворачивания потомков
                const toggleButton = document.createElement('span');
                // toggleButton.className = 'menu_el';
                toggleButton.textContent = '▷';
                listItem.insertBefore(toggleButton, titleElement);

                // Обработчик события клика на кнопку сворачивания/разворачивания
                titleElement.className = 'with_left_shift';
                titleElement.addEventListener('click', function () {
                    const nestedList = listItem.querySelector('div');
                    nestedList.className = 'menu_el';
                    if (nestedList.style.display === 'none') {
                        nestedList.style.display = 'block';
                        toggleButton.textContent = '▽';
                    } else {
                        nestedList.style.display = 'none';
                        toggleButton.textContent = '▷';
                    }
                });

                const nestedList = document.createElement('div');
                nestedList.className = 'menu_el';
                nestedList.style.display = 'none'; // По умолчанию скрываем потомков
                listItem.appendChild(nestedList);
                createTreeElements(child.id, nestedList);
            } else {
                listItem.className = 'menu_el2';
                listItem.addEventListener('click', function () {
                    console.log("titleElement.textContent = ", titleElement.textContent);
                    // selected_item
                    const selected_item = document.getElementById('selected_item');
                    selected_item.textContent = titleElement.textContent;
                });
            }

            // Добавляем созданный элемент списка к родительскому элементу
            parentNode.appendChild(listItem);
        });
    }

    // Вызываем функцию для создания дочерних элементов корневого элемента
    createTreeElements(null, rootNode);

    return rootNode;
}

function displayTree(tree) {
    const container = document.getElementById('treeContainer'); // Замените 'treeContainer' на ID элемента, в котором вы хотите отобразить дерево
    container.appendChild(tree);
}

// Основная функция для получения данных, построения и отображения дерева
async function main() {
    const data = await getData();
    const tree = buildTree(data["services"]);
    displayTree(tree);
    // document.body.appendChild(tree);
}

// Вызываем основную функцию при загрузке страницы
window.addEventListener('DOMContentLoaded', main);