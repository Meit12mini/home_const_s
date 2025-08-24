import React from 'react';

const testimonials = [
    {
        quote: "Мы в восторге! Весь процесс от выбора на сайте до получения ключей был прозрачным и понятным. Конструктор - это гениально, сразу видишь цену!",
        name: "Семья Ивановых",
        project: "Проект 'Оптима 80'",
        avatar: "https://picsum.photos/seed/avatar1/100/100"
    },
    {
        quote: "Никаких скрытых платежей и 'сюрпризов' в процессе. Цена, которую посчитали на сайте, такой и осталась в договоре. Спасибо за честность и качество!",
        name: "Алексей и Мария",
        project: "Проект 'Простор 120'",
        avatar: "https://picsum.photos/seed/avatar2/100/100"
    }
];

const Testimonials: React.FC = () => {
    return (
        <section id="testimonials" className="py-16 sm:py-24 bg-brand-blue text-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold">Отзывы наших клиентов</h2>
                    <p className="mt-4 text-lg text-blue-200">Лучшая реклама - это счастливые новоселы.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {testimonials.map((testimonial, index) => (
                        <div key={index} className="bg-white/10 p-8 rounded-xl shadow-lg">
                            <blockquote className="text-lg italic text-blue-100 mb-6">
                                "{testimonial.quote}"
                            </blockquote>
                            <div className="flex items-center">
                                <img src={testimonial.avatar} alt={testimonial.name} className="w-14 h-14 rounded-full border-2 border-brand-gold object-cover"/>
                                <div className="ml-4">
                                    <p className="font-bold text-white">{testimonial.name}</p>
                                    <p className="text-blue-200 text-sm">{testimonial.project}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;