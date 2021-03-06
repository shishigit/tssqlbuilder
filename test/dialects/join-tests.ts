import {Harness} from './support'

var user = Harness.defineUserTable();
var post = Harness.definePostTable();
var comment = Harness.defineCommentTable();

Harness.test({
    query: user.select(user.name, post.content).from(user.join(post).on(user.id.equals(post.userId))),
    pg: {
        text: 'SELECT "user"."name", "post"."content" FROM "user" INNER JOIN "post" ON ("user"."id" = "post"."userId")',
        string: 'SELECT "user"."name", "post"."content" FROM "user" INNER JOIN "post" ON ("user"."id" = "post"."userId")'
    },
    sqlite: {
        text: 'SELECT "user"."name", "post"."content" FROM "user" INNER JOIN "post" ON ("user"."id" = "post"."userId")',
        string: 'SELECT "user"."name", "post"."content" FROM "user" INNER JOIN "post" ON ("user"."id" = "post"."userId")'
    },
    mysql: {
        text: 'SELECT `user`.`name`, `post`.`content` FROM `user` INNER JOIN `post` ON (`user`.`id` = `post`.`userId`)',
        string: 'SELECT `user`.`name`, `post`.`content` FROM `user` INNER JOIN `post` ON (`user`.`id` = `post`.`userId`)'
    },
    mssql: {
        text: 'SELECT [user].[name], [post].[content] FROM [user] INNER JOIN [post] ON ([user].[id] = [post].[userId])',
        string: 'SELECT [user].[name], [post].[content] FROM [user] INNER JOIN [post] ON ([user].[id] = [post].[userId])'
    },
    oracle: {
        text: 'SELECT "user"."name", "post"."content" FROM "user" INNER JOIN "post" ON ("user"."id" = "post"."userId")',
        string: 'SELECT "user"."name", "post"."content" FROM "user" INNER JOIN "post" ON ("user"."id" = "post"."userId")'
    },
    params: []
});

Harness.test({
    query: user.join(post).on(user.id.equals(post.userId)),
    pg: {
        text: '"user" INNER JOIN "post" ON ("user"."id" = "post"."userId")',
        string: '"user" INNER JOIN "post" ON ("user"."id" = "post"."userId")'
    },
    sqlite: {
        text: '"user" INNER JOIN "post" ON ("user"."id" = "post"."userId")',
        string: '"user" INNER JOIN "post" ON ("user"."id" = "post"."userId")'
    },
    mysql: {
        text: '`user` INNER JOIN `post` ON (`user`.`id` = `post`.`userId`)',
        string: '`user` INNER JOIN `post` ON (`user`.`id` = `post`.`userId`)'
    },
    mssql: {
        text: '[user] INNER JOIN [post] ON ([user].[id] = [post].[userId])',
        string: '[user] INNER JOIN [post] ON ([user].[id] = [post].[userId])'
    },
    oracle: {
        text: '"user" INNER JOIN "post" ON ("user"."id" = "post"."userId")',
        string: '"user" INNER JOIN "post" ON ("user"."id" = "post"."userId")'
    },
    params: []
});

Harness.test({
    query: user
        .select(user.name, post.content, comment.text)
        .from(
            user
                .join(post).on(user.id.equals(post.userId))
                .join(comment).on(post.id.equals(comment.postId))),
    pg: {
        text: 'SELECT "user"."name", "post"."content", "comment"."text" FROM "user" INNER JOIN "post" ON ("user"."id" = "post"."userId") INNER JOIN "comment" ON ("post"."id" = "comment"."postId")',
        string: 'SELECT "user"."name", "post"."content", "comment"."text" FROM "user" INNER JOIN "post" ON ("user"."id" = "post"."userId") INNER JOIN "comment" ON ("post"."id" = "comment"."postId")'
    },
    sqlite: {
        text: 'SELECT "user"."name", "post"."content", "comment"."text" FROM "user" INNER JOIN "post" ON ("user"."id" = "post"."userId") INNER JOIN "comment" ON ("post"."id" = "comment"."postId")',
        string: 'SELECT "user"."name", "post"."content", "comment"."text" FROM "user" INNER JOIN "post" ON ("user"."id" = "post"."userId") INNER JOIN "comment" ON ("post"."id" = "comment"."postId")'
    },
    mysql: {
        text: 'SELECT `user`.`name`, `post`.`content`, `comment`.`text` FROM `user` INNER JOIN `post` ON (`user`.`id` = `post`.`userId`) INNER JOIN `comment` ON (`post`.`id` = `comment`.`postId`)',
        string: 'SELECT `user`.`name`, `post`.`content`, `comment`.`text` FROM `user` INNER JOIN `post` ON (`user`.`id` = `post`.`userId`) INNER JOIN `comment` ON (`post`.`id` = `comment`.`postId`)'
    },
    mssql: {
        text: 'SELECT [user].[name], [post].[content], [comment].[text] FROM [user] INNER JOIN [post] ON ([user].[id] = [post].[userId]) INNER JOIN [comment] ON ([post].[id] = [comment].[postId])',
        string: 'SELECT [user].[name], [post].[content], [comment].[text] FROM [user] INNER JOIN [post] ON ([user].[id] = [post].[userId]) INNER JOIN [comment] ON ([post].[id] = [comment].[postId])'
    },
    oracle: {
        text: 'SELECT "user"."name", "post"."content", "comment"."text" FROM "user" INNER JOIN "post" ON ("user"."id" = "post"."userId") INNER JOIN "comment" ON ("post"."id" = "comment"."postId")',
        string: 'SELECT "user"."name", "post"."content", "comment"."text" FROM "user" INNER JOIN "post" ON ("user"."id" = "post"."userId") INNER JOIN "comment" ON ("post"."id" = "comment"."postId")'
    },
    params: []
});

Harness.test({
    query: user.select(user.name, post.content).from(user.leftJoin(post).on(user.id.equals(post.userId))),
    pg: {
        text: 'SELECT "user"."name", "post"."content" FROM "user" LEFT JOIN "post" ON ("user"."id" = "post"."userId")',
        string: 'SELECT "user"."name", "post"."content" FROM "user" LEFT JOIN "post" ON ("user"."id" = "post"."userId")'
    },
    sqlite: {
        text: 'SELECT "user"."name", "post"."content" FROM "user" LEFT JOIN "post" ON ("user"."id" = "post"."userId")',
        string: 'SELECT "user"."name", "post"."content" FROM "user" LEFT JOIN "post" ON ("user"."id" = "post"."userId")'
    },
    mysql: {
        text: 'SELECT `user`.`name`, `post`.`content` FROM `user` LEFT JOIN `post` ON (`user`.`id` = `post`.`userId`)',
        string: 'SELECT `user`.`name`, `post`.`content` FROM `user` LEFT JOIN `post` ON (`user`.`id` = `post`.`userId`)'
    },
    mssql: {
        text: 'SELECT [user].[name], [post].[content] FROM [user] LEFT JOIN [post] ON ([user].[id] = [post].[userId])',
        string: 'SELECT [user].[name], [post].[content] FROM [user] LEFT JOIN [post] ON ([user].[id] = [post].[userId])'
    },
    oracle: {
        text: 'SELECT "user"."name", "post"."content" FROM "user" LEFT JOIN "post" ON ("user"."id" = "post"."userId")',
        string: 'SELECT "user"."name", "post"."content" FROM "user" LEFT JOIN "post" ON ("user"."id" = "post"."userId")'
    },
    params: []
});

Harness.test({
    query: user
        .select(user.name, post.content)
        .from(
            user
                .leftJoin(post).on(user.id.equals(post.userId))
                .leftJoin(comment).on(post.id.equals(comment.postId))),
    pg: {
        text: 'SELECT "user"."name", "post"."content" FROM "user" LEFT JOIN "post" ON ("user"."id" = "post"."userId") LEFT JOIN "comment" ON ("post"."id" = "comment"."postId")',
        string: 'SELECT "user"."name", "post"."content" FROM "user" LEFT JOIN "post" ON ("user"."id" = "post"."userId") LEFT JOIN "comment" ON ("post"."id" = "comment"."postId")'
    },
    sqlite: {
        text: 'SELECT "user"."name", "post"."content" FROM "user" LEFT JOIN "post" ON ("user"."id" = "post"."userId") LEFT JOIN "comment" ON ("post"."id" = "comment"."postId")',
        string: 'SELECT "user"."name", "post"."content" FROM "user" LEFT JOIN "post" ON ("user"."id" = "post"."userId") LEFT JOIN "comment" ON ("post"."id" = "comment"."postId")'
    },
    mysql: {
        text: 'SELECT `user`.`name`, `post`.`content` FROM `user` LEFT JOIN `post` ON (`user`.`id` = `post`.`userId`) LEFT JOIN `comment` ON (`post`.`id` = `comment`.`postId`)',
        string: 'SELECT `user`.`name`, `post`.`content` FROM `user` LEFT JOIN `post` ON (`user`.`id` = `post`.`userId`) LEFT JOIN `comment` ON (`post`.`id` = `comment`.`postId`)'
    },
    mssql: {
        text: 'SELECT [user].[name], [post].[content] FROM [user] LEFT JOIN [post] ON ([user].[id] = [post].[userId]) LEFT JOIN [comment] ON ([post].[id] = [comment].[postId])',
        string: 'SELECT [user].[name], [post].[content] FROM [user] LEFT JOIN [post] ON ([user].[id] = [post].[userId]) LEFT JOIN [comment] ON ([post].[id] = [comment].[postId])'
    },
    oracle: {
        text: 'SELECT "user"."name", "post"."content" FROM "user" LEFT JOIN "post" ON ("user"."id" = "post"."userId") LEFT JOIN "comment" ON ("post"."id" = "comment"."postId")',
        string: 'SELECT "user"."name", "post"."content" FROM "user" LEFT JOIN "post" ON ("user"."id" = "post"."userId") LEFT JOIN "comment" ON ("post"."id" = "comment"."postId")'
    },
    params: []
});

var subposts = post
    .subQuery('subposts')
    .select(
        post.content,
        post.userId.as('subpostUserId'))
    .from(post);

Harness.test({
    query: user
        .select(user.name, subposts.content)
        .from(user.join(subposts)
            .on(user.id.equals(subposts.subpostUserId))),
    pg: {
        text: 'SELECT "user"."name", "subposts"."content" FROM "user" INNER JOIN (SELECT "post"."content", "post"."userId" AS "subpostUserId" FROM "post") "subposts" ON ("user"."id" = "subposts"."subpostUserId")',
        string: 'SELECT "user"."name", "subposts"."content" FROM "user" INNER JOIN (SELECT "post"."content", "post"."userId" AS "subpostUserId" FROM "post") "subposts" ON ("user"."id" = "subposts"."subpostUserId")'
    },
    sqlite: {
        text: 'SELECT "user"."name", "subposts"."content" FROM "user" INNER JOIN (SELECT "post"."content", "post"."userId" AS "subpostUserId" FROM "post") "subposts" ON ("user"."id" = "subposts"."subpostUserId")',
        string: 'SELECT "user"."name", "subposts"."content" FROM "user" INNER JOIN (SELECT "post"."content", "post"."userId" AS "subpostUserId" FROM "post") "subposts" ON ("user"."id" = "subposts"."subpostUserId")'
    },
    mysql: {
        text: 'SELECT `user`.`name`, `subposts`.`content` FROM `user` INNER JOIN (SELECT `post`.`content`, `post`.`userId` AS `subpostUserId` FROM `post`) `subposts` ON (`user`.`id` = `subposts`.`subpostUserId`)',
        string: 'SELECT `user`.`name`, `subposts`.`content` FROM `user` INNER JOIN (SELECT `post`.`content`, `post`.`userId` AS `subpostUserId` FROM `post`) `subposts` ON (`user`.`id` = `subposts`.`subpostUserId`)'
    },
    mssql: {
        text: 'SELECT [user].[name], [subposts].[content] FROM [user] INNER JOIN (SELECT [post].[content], [post].[userId] AS [subpostUserId] FROM [post]) [subposts] ON ([user].[id] = [subposts].[subpostUserId])',
        string: 'SELECT [user].[name], [subposts].[content] FROM [user] INNER JOIN (SELECT [post].[content], [post].[userId] AS [subpostUserId] FROM [post]) [subposts] ON ([user].[id] = [subposts].[subpostUserId])'
    },
    oracle: {
        text: 'SELECT "user"."name", "subposts"."content" FROM "user" INNER JOIN (SELECT "post"."content", "post"."userId" "subpostUserId" FROM "post") "subposts" ON ("user"."id" = "subposts"."subpostUserId")',
        string: 'SELECT "user"."name", "subposts"."content" FROM "user" INNER JOIN (SELECT "post"."content", "post"."userId" "subpostUserId" FROM "post") "subposts" ON ("user"."id" = "subposts"."subpostUserId")'
    },
    params: []
});

Harness.test({
    query: user.select().from(user.leftJoinLateral(post.subQuery().select(post.userId))),
    pg: {
        text: 'SELECT "user".* FROM "user" LEFT JOIN LATERAL (SELECT "post"."userId" FROM "post") ON true',
        string: 'SELECT "user".* FROM "user" LEFT JOIN LATERAL (SELECT "post"."userId" FROM "post") ON true'
    },
    mssql: {
        text: 'SELECT [user].* FROM [user] OUTER APPLY (SELECT [post].[userId] FROM [post])',
        string: 'SELECT [user].* FROM [user] OUTER APPLY (SELECT [post].[userId] FROM [post])'
    },
    oracle: {
        text: 'SELECT "user".* FROM "user" OUTER APPLY (SELECT "post"."userId" FROM "post")',
        string: 'SELECT "user".* FROM "user" OUTER APPLY (SELECT "post"."userId" FROM "post")'
    },
    params: []
});

Harness.test({
    query: user.select().from(user.leftJoinLateral(post.subQuery().select(post.userId).where(user.id.equals(post.userId)))),
    pg: {
        text: 'SELECT "user".* FROM "user" LEFT JOIN LATERAL (SELECT "post"."userId" FROM "post" WHERE ("user"."id" = "post"."userId")) ON true',
        string: 'SELECT "user".* FROM "user" LEFT JOIN LATERAL (SELECT "post"."userId" FROM "post" WHERE ("user"."id" = "post"."userId")) ON true'
    },
    mssql: {
        text: 'SELECT [user].* FROM [user] OUTER APPLY (SELECT [post].[userId] FROM [post] WHERE ([user].[id] = [post].[userId]))',
        string: 'SELECT [user].* FROM [user] OUTER APPLY (SELECT [post].[userId] FROM [post] WHERE ([user].[id] = [post].[userId]))'
    },
    oracle: {
        text: 'SELECT "user".* FROM "user" OUTER APPLY (SELECT "post"."userId" FROM "post" WHERE ("user"."id" = "post"."userId"))',
        string: 'SELECT "user".* FROM "user" OUTER APPLY (SELECT "post"."userId" FROM "post" WHERE ("user"."id" = "post"."userId"))'
    },
    params: []
});

Harness.test({
    query: user.select().from(user
        .leftJoinLateral(post.subQuery().select(post.userId))
        .leftJoinLateral(comment.subQuery().select(comment.postId))),
    pg: {
        text: 'SELECT "user".* FROM "user" LEFT JOIN LATERAL (SELECT "post"."userId" FROM "post") ON true LEFT JOIN LATERAL (SELECT "comment"."postId" FROM "comment") ON true',
        string: 'SELECT "user".* FROM "user" LEFT JOIN LATERAL (SELECT "post"."userId" FROM "post") ON true LEFT JOIN LATERAL (SELECT "comment"."postId" FROM "comment") ON true'
    },
    mssql: {
        text: 'SELECT [user].* FROM [user] OUTER APPLY (SELECT [post].[userId] FROM [post]) OUTER APPLY (SELECT [comment].[postId] FROM [comment])',
        string: 'SELECT [user].* FROM [user] OUTER APPLY (SELECT [post].[userId] FROM [post]) OUTER APPLY (SELECT [comment].[postId] FROM [comment])'
    },
    oracle: {
        text: 'SELECT "user".* FROM "user" OUTER APPLY (SELECT "post"."userId" FROM "post") OUTER APPLY (SELECT "comment"."postId" FROM "comment")',
        string: 'SELECT "user".* FROM "user" OUTER APPLY (SELECT "post"."userId" FROM "post") OUTER APPLY (SELECT "comment"."postId" FROM "comment")'
    },
    params: []
});

