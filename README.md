# Документация по [ARent.app](https://staging.arent.app)

> Подробная информация об архитектуре проекта для быстрого и удобного ознакомления.

**Предметная область (domain) - аренда жилья (rental apartment)**. При поиске жилья пользователю предоставляется возможность выбрать тип аренды.

Тип аренды бывает двух типов:

- краткосрочная аренда (short term rent)
- долгосрочная аренда (long term rent)

После поиска подходящего объявления, арендатор может заключить договор с арендадателем на проживание.

В приложении также присутствует чат и платежная система [Innopay.kz](https://innopay.kz).

# Доменный слой (domain layer)

Этот слой содержит бизнес-правила приложения.

Домен строится с использованием сущностей (entities) и объектов-значения (value-objects) описанных через [ubiquitous language](https://martinfowler.com/bliki/UbiquitousLanguage.html). Наиболее подробнее блоки домена описаны ниже.

## Доменные сущности (domain entities)

Сущности являются ядром домена. Они инкапсулируют бизнес-правила и атрибуты для всего предприятия. Сущность может быть объектом со свойствами и методами или набором структур данных и функций.

Сущности представляют бизнес-модели и выражают, какими свойствами обладает конкретная модель, что она может делать, когда и при каких условиях она может это делать. Примером бизнес-модели может быть Пользователь, Объявление, Бронирование, Кошелек и т. д.

Сущности всегда должны защищать свой инвариант:

> Сущность домена всегда должна быть валидна. В ней есть определенное количество инвариантов которые должны быть истинными. Например, порядок позиции заказа всегда должен быть положительным целым числом и иметь название товара и цену. Следовательно, применение инвариантов это отвественность доменной сущности (особенно корня агрегата (aggregate root)), таким образом доменная сущность не должна существовать будучи инвалидной.

Сущность (entity):

- Содержит бизнес логику домена. Избегайте появления бизнес логики в ваших сервисах если это возможно, это приводит к [анемичной модели домена](https://martinfowler.com/bliki/AnemicDomainModel.html) (доменные сервисы служат исключение для бизнес логики которую не возможно положить в одну сущность).
- Иметь идентичность, которая определяет его и делает его отличимым от других. Его идентичность неизменна на протяжении всего жизненного цикла.
- Равенство между двумя сущностями определяется путем сравнения их идентификаторов (обычно это поле id).
- Может содержать другие объекты, например другие сущности (entities) или объекты-значения (value-objects).
- Отвечают за сбор всей информации о состоянии и его изменении в одном месте.
- Отвечает за координацию операций на принадлежащих ему объектах.
- Ничего не знать о верхних уровнях (сервисы, контроллеры и т. д.).
- Данные сущностей предметной области должны быть смоделированы с учетом бизнес-логики, а не какой-либо схемы базы данных.
- Сущности должны защищать свои инварианты, стараться избегать общедоступных сеттеров — обновлять состояние с помощью методов и при необходимости выполнять проверку инварианта при каждом обновлении (это может быть простой метод validate(), который проверяет, не нарушаются ли бизнес-правила обновлением).
- Должен быть последовательным при создании. Проверяйте объекты и другие объекты домена при создании и выдавайте ошибку при первом сбое. [Fail Fast](https://en.wikipedia.org/wiki/Fail-fast).
- Избегайте конструкторов без аргументов (пустых), принимайте и проверяйте все необходимые свойства в конструкторе (или в фабричном методе, таком как create()).
- Для опциональных свойств, требующих сложной настройки, можно использовать [Fluent interface](https://en.wikipedia.org/wiki/Fluent_interface) и шаблон [Builder Pattern](https://refactoring.guru/design-patterns/builder).
- Сделать Entities частично неизменяемыми. Определите, какие свойства не должны изменяться после создания, и сделайте их доступными только для чтения (например, id или createdAt).

**Заметка**: Многие люди склонны создавать один модуль для каждой сущности, но этот подход не очень хорош. Каждый модуль может иметь несколько объектов. Следует иметь в виду, что размещение объектов в одном модуле требует, чтобы эти объекты имели связанную бизнес-логику, не группируйте несвязанные объекты в одном модуле.

Примеры файлов:

- [user.entity.ts](src/domains/user/domain/entities/user.entity.ts)
- [apartment-ad.entity.ts](src/domains/apartment-ad/domain/entities/apartment-ad.entity.ts)

Читать подробнее:

- [Domain Entity pattern](https://badia-kharroubi.gitbooks.io/microservices-architecture/content/patterns/tactical-patterns/domain-entity-pattern.html)
- [Secure by design: Chapter 6 Ensuring integrity of state](https://livebook.manning.com/book/secure-by-design/chapter-6/)

## Аггрегаты (aggregates)

[Агрегат](https://martinfowler.com/bliki/DDD_Aggregate.html) - это класетр объектов домена, которые можно рассматривать как единое целое. Он инкапсулирует сущьности (entities) и объекты-значения (value-objects) которые концептуально пренадлежат друг другу. Он также содержит набор операций, над которыми могут работать эти объекты предметной области.

- Агрегаты помогают упростить модель предметной области, собирая несколько объектов предметной области в рамках одной абстракции.
- Агрегаты не должны зависеть от модели данных. Связи между объектами домена — это не то же самое, что отношения базы данных.
- Рут агрегат — это сущность, которая содержит другие сущности/объекты-значения и всю логику для их работы.
- Рут агрегат имеет глобальную идентификацию ([UUID/GUID](https://en.wikipedia.org/wiki/Universally_unique_identifier)/первичный ключ). Сущности внутри границы агрегата имеют локальные идентификаторы, уникальные только в пределах агрегата.
- Рут агрегат - это шлюз ко всему агрегату. Любые ссылки из-за пределов агрегата должны **только** идти к рут агрегату.
- Любые операции с агрегатом должны быть [транзакционными операциями](https://en.wikipedia.org/wiki/Database_transaction). Либо все сохраняется/обновляется/удаляется, либо ничего.
- Только рут агрегаты могут быть получены непосредственно с помощью запросов к базе данных. Все остальное нужно делать через обход.
- Как и «сущности», агрегаты должны защищать свои инварианты на протяжении всего жизненного цикла. Когда фиксируется изменение любого объекта в пределах границы Агрегата, все инварианты всего Агрегата должны быть удовлетворены. Проще говоря, все объекты в агрегате должны быть согласованы, а это означает, что если один объект внутри агрегата изменяет состояние, это не должно конфликтовать с другими объектами предметной области внутри этого агрегата (это называется _сonsistency boundary_ ).
- Объекты в Агрегате могут ссылаться на другие рут агрегаты через их глобальный уникальный идентификатор (id). Избегайте использования прямой ссылки на объект.
- Старайтесь избегать слишком больших агрегатов, это может привести к проблемам с производительностью и обслуживанием.
- Агрегаты могут публиковать «События домена» (подробнее об этом ниже).

Все эти правила просто исходят из идеи создания границы вокруг агрегатов. Границы упрощают бизнес-модель, поскольку заставляют нас очень тщательно рассматривать каждую взаимосвязь в рамках четко определенного набора правил.

Таким образом, если вы объединяете несколько связанных сущностей и объектов-значений внутри одной рут «сущности», эта рут «сущность» становится «рут агрегатом», а этот кластер связанных сущностей и объектов-значений становится «агрегатом».

Примеры файлов:

- [aggregate-root.base.ts](src/libs/ddd/domain/base-classes/aggregate-root.base.ts) - базовый абстрактный класс.
- [user.entity.ts](src/modules/user/domain/entities/user.entity.ts) - агрегаты это просто объекты, которые должны следовать набору определенных правил, описанных выше.

Читать подробнее:

- [Understanding Aggregates in Domain-Driven Design](https://dzone.com/articles/domain-driven-design-aggregate)
- [What Are Aggregates In Domain-Driven Design?](https://www.jamesmichaelhickey.com/domain-driven-design-aggregates/) <- this is a series of multiple articles, don't forget to click "Next article" at the end.
- [Effective Aggregate Design Part I: Modeling a Single Aggregate](https://www.dddcommunity.org/wp-content/uploads/files/pdf_articles/Vernon_2011_1.pdf)
- [Effective Aggregate Design Part II: Making Aggregates Work Together](https://www.dddcommunity.org/wp-content/uploads/files/pdf_articles/Vernon_2011_2.pdf)

## Объекты значений

Некоторые Атрибуты и поведения могут быть перемещены из самой сущности и помещены в «Объекты-значения».

Объекты значений:

- Не имеет id. Равенство определяется через структурное свойство.
- Являетсы иммутабельным.
- Может использоваться как атрибут «сущностей» и других «объектов-значений».
- Явно определяет и обеспечивает соблюдение важных ограничений (инвариантов).

Объект-значение должен быть не просто удобной группой атрибутов, а формировать четко определенную концепцию в модели предметной области. Это верно, даже если он содержит только один атрибут. Когда он моделируется как концептуальное целое, он несет смысл при передаче и может поддерживать свои ограничения.

Представьте, что у вас есть сущность «Пользователь», которая должна иметь «адрес» пользователя. Обычно адрес представляет собой просто сложное значение, которое не имеет идентификатора в домене и состоит из нескольких других значений, таких как «страна», «улица», «почтовый индекс» и т. д., поэтому его можно моделировать и обрабатывать как «объект значения» со своей собственной бизнес-логикой.

Примеры файлов:

- [address.value-object.ts](src/libs/ddd/domain/value-objects/address.value-object.ts)

Читать подробнее:

- [Martin Fowler blog](https://martinfowler.com/bliki/ValueObject.html)
- [Value Objects to the rescue](https://medium.com/swlh/value-objects-to-the-rescue-28c563ad97c6).
- [Value Object pattern](https://badia-kharroubi.gitbooks.io/microservices-architecture/content/patterns/tactical-patterns/value-object-pattern.html)

## Инварианты домена

Домен [инварианты](<https://en.wikipedia.org/wiki/Invariant_(mathematics)#Invariants_in_computer_science>) — это политики и условия, которые всегда выполняются для Домена в конкретном контексте. Инварианты определяют, что возможно или что запрещено в контексте.

Внедрение инвариантов является обязанностью объектов предметной области (особенно сущностей и рут агрегатов).

Существует определенное количество инвариантов объекта, которые всегда должны быть истинными. Например:

- При отправке денег сумма всегда должна быть положительным целым числом, и всегда должен быть номер кредитной карты получателя в правильном формате;
- Клиент не может приобрести товар, которого нет в наличии;
- баланс кошелька клиента не может быть меньше 0;
- и так далее.

Если в бизнесе есть некоторые правила, подобные описанным выше, объект домена не должен существовать без соблюдения этих правил.

# Важные замечания

У контракта есть поле `nextPaymentTransactionId` там должна храниться следующая `cash in` транзакция. При оплате этой транзакции нужно обязательно обновить это поле, используя команду `UpdateContractPaymentTransactionCommand`.
