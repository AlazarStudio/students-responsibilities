// src/data.js

export const userData = [
    {
        id: 1,
        role: 'admin', // роли: admin или user
        email: 'admin@example.com',
        password: 'admin123', // простые данные для примера, заменить в будущем
    },
    {
        id: 2,
        role: 'user',
        email: 'user@example.com',
        password: 'user123',
    },
];

export const rightsData = [
    {
        id: 1,
        title: 'Право на обучение',
        description: 'Каждый студент имеет право на получение качественного образования.',
    },
    {
        id: 2,
        title: 'Право на академическую свободу',
        description: 'Студенты имеют право выражать свои взгляды на учебный процесс.',
    },
];

export const obligationsData = [
    {
        id: 1,
        title: 'Посещение занятий',
        description: 'Студенты обязаны посещать все обязательные занятия.',
    },
    {
        id: 2,
        title: 'Соблюдение правил',
        description: 'Студенты обязаны соблюдать правила внутреннего распорядка.',
    },
];

export const faqData = [
    { id: 1, question: "Как получить справку об обучении?", answer: "Обратитесь в деканат вашего факультета." },
    { id: 2, question: "Куда обращаться за консультацией?", answer: "Вы можете обратиться к куратору группы или в студенческий совет." },
];

export const contactsData = [
    { id: 1, name: "Деканат", phone: "+7 (123) 456-78-90", email: "dekanat@example.com" },
    { id: 2, name: "Студенческий совет", phone: "+7 (987) 654-32-10", email: "studsovet@example.com" },
];

