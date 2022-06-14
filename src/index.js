/**
 * Принимает два объекта, должна вернуть или true или false, если объекты идентичны внутри, возвращает
 * true, если есть различие, false. То есть проверяет каждое свойство, вне зависимости от вложенности,
 * делаем через рекурсию(а других вариантов и нет)
 */
export const deepEqual = (obj, anotherObject) => {
    return Object.entries(obj).every(function ([key, value]) {
        return anotherObject[key] && typeof value === 'object' ? deepEqual(value, anotherObject[key]) : value === anotherObject[key];
    })
};

/**
 * Принимает объект, возвращает его глубокую копию, то есть ни одно свойство
 * не является ссылочным у другого объекта, точно возвращает новое.
 * Если это массив, возвращает новый массив(map) и если элемент массива не простого типа,
 * то тогда в рекурсию. С объектом также. Поскольку массив при typeof возвращает object, чтобы
 * их различить берем метод Array.isArray и он на массивах вернет тру
 */
export const deepCopy = (obj) => {
    if (typeof obj !== 'object' || obj === null || obj === undefined) {
        return obj
    }

    if (Array.isArray(obj)) {
        return obj.map(element => deepCopy(element));
    } else {
        return Object.entries(obj).reduce((arr, [key, value]) => (arr[key] = deepCopy(value), arr), {});
    }
};

/**
 * Мы передаем объект, и должны вернуть массив уникальных названий свойств
 * То есть если у нас объект { name: { bohdan: { name: 'test' } } } вернет ['name', 'bohdan']
 */
export const getAllObjectKeys = (obj) => {
    return Object.entries(obj).reduce((array, [key, value]) => {
        array.push(key);
        if (typeof value === 'object') {
            array.push(key, ...getAllObjectKeys(value));
        }
        return [...new Set(array)];
    })
};