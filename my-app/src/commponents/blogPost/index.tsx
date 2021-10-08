
export default function BlogPostComponent() {


    return (

        <>  
                    <div className="blogContent">
                        <h1 className="blogTitle">Название поста</h1>
                        <div className="blogCopyright">08 июня, 2021 <span>от <a href="https://twitter.com/acdlite">Andrew Clark</a><span>, </span><a href="https://github.com/bvaughn">Brian Vaughn</a><span> and </span><a href="https://twitter.com/sethwebster">Seth Webster</a></span></div>
                        <p className="blogContentListTitle">Основные моменты поста:</p>
                        <ol>
                            <li className='blogContentList'>Мы начали работу над выпуском React 18, который станет нашей следующей основной версией.</li>
                            <li className='blogContentList'>Мы создали рабочую группу, чтобы подготовить сообщество к постепенному внедрению новых функций в React 18.</li>
                            <li className='blogContentList'>Мы опубликовали альфа-версию React 18, чтобы авторы библиотеки могли попробовать ее и оставить отзыв.</li>
                        </ol>
                        <h2 className="blogContentSubtitle">Заголовок первой подтемы</h2>
                        <p className="blogContentText">Мы успешно отправили параллельные функции десяткам тысяч компонентов в Facebook и по нашему опыту обнаружили, что большинство компонентов React «просто работают» без дополнительных изменений. Мы стремимся обеспечить плавное обновление для всего сообщества, поэтому сегодня мы объявляем о создании рабочей группы React 18.</p>
                        <p className="blogContentText">Мы успешно отправили параллельные функции десяткам тысяч компонентов в Facebook и по нашему опыту обнаружили, что большинство компонентов React «просто работают» без дополнительных изменений. Мы стремимся обеспечить плавное обновление для всего сообщества, поэтому сегодня мы объявляем о создании рабочей группы React 18.</p>
                        <p className="blogContentText">Мы успешно отправили параллельные функции десяткам тысяч компонентов в Facebook и по нашему опыту обнаружили, что большинство компонентов React «просто работают» без дополнительных изменений. Мы стремимся обеспечить плавное обновление для всего сообщества, поэтому сегодня мы объявляем о создании рабочей группы React 18.</p>
                    </div>
        </>
    )
}