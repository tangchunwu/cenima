export interface HorseDef {
       id: string;
       name: string;
       description: string;
       shortDesc: string;
       attributes: {
              摸鱼指数: number;
              暴躁值: number;
              干饭能力: number;
              卷度: number;
       };
       color: string;
       image: string;
}

export const horses: HorseDef[] = [
       {
              id: 'niuma',
              name: '牛马',
              description: '全公司最好用的牲口就是你。老板一个眼神你就自觉加班，同事甩个锅你就默默接住。你以为你是在奋斗，其实你只是便宜。别人拿你当牛使，你还感恩戴德说声"谢谢老板栽培"。',
              shortDesc: '"公司没了谁都行，没了我不行"',
              attributes: {
                     摸鱼指数: 5,
                     暴躁值: 20,
                     干饭能力: 30,
                     卷度: 100
              },
              color: '#8B4513',
              image: '/horses/niuma.jpg'
       },
       {
              id: 'bailongma',
              name: '白聋马',
              description: '职场聋哑人，老板叫你你假装耳鸣，同事喊你你突然眼瞎。消息永远看不到，电话永远打不通，但外卖到了你第一个冲出去。选择性耳聋领域的天花板，装死界的扛把子。',
              shortDesc: '"啊？你说啥？我没听见"',
              attributes: {
                     摸鱼指数: 95,
                     暴躁值: 10,
                     干饭能力: 60,
                     卷度: 0
              },
              color: '#E0E0E0',
              image: '/horses/bailongma.jpg'
       },
       {
              id: 'madongmei',
              name: '马冬梅',
              description: '老板上午说的话下午就忘，会议纪要写了也白写。同事问你："昨天那个事进度怎么样了？"你一脸真诚地反问："什么事？"你不是故意的，你是真的记不住，脑子是个筛子。',
              shortDesc: '"什么冬梅？马什么梅？"',
              attributes: {
                     摸鱼指数: 50,
                     暴躁值: 20,
                     干饭能力: 70,
                     卷度: 30
              },
              color: '#9C27B0',
              image: '/horses/madongmei.jpg'
       },
       {
              id: 'mabee',
              name: '马bee',
              description: '第1版：不行。第2版：差点意思。第50版：有感觉了。第99版：嗯...还是第1版好。你笑着说"好的马上改"，手已经在桌子底下攥成了拳头。你不是在工作，你是在渡劫。',
              shortDesc: '"好的我改！你开心就好！"（已疯）',
              attributes: {
                     摸鱼指数: 30,
                     暴躁值: 100,
                     干饭能力: 40,
                     卷度: 60
              },
              color: '#FF5722',
              image: '/horses/mabee.jpg'
       },
       {
              id: 'huangama',
              name: '皇阿马',
              description: '在你眼里，老板算个屁。开会你迟到，任务你挑着干，领导批评你直接怼回去。不是你有背景，是你打心底觉得自己天下第一，其他人都是来给你打工的。别人不理解，你也懒得解释——跟平民解释什么？',
              shortDesc: '"朕说的话，还需要解释？"',
              attributes: {
                     摸鱼指数: 60,
                     暴躁值: 70,
                     干饭能力: 50,
                     卷度: 20
              },
              color: '#FFC107',
              image: '/horses/huangama.jpg'
       },
       {
              id: 'daoma',
              name: '刀马',
              description: '每天上班都在心里捅人一百遍。打卡机是你的第一个敌人，电脑是第二个，同事是第三个到第N个。你不是来上班的，你是来忍耐的，你能撑到现在没进去已经很了不起了。',
              shortDesc: '"今天谁第一个惹我，谁倒霉"',
              attributes: {
                     摸鱼指数: 40,
                     暴躁值: 95,
                     干饭能力: 30,
                     卷度: 25
              },
              color: '#D32F2F',
              image: '/horses/daoma.jpg'
       },
       {
              id: 'zhanma',
              name: '战马',
              description: '闹钟还没响你就到公司了，同事还没来你已经干完两件事。你觉得摸鱼是犯罪，准时下班是耻辱。老板提拔你是因为你好用，同事讨厌你是因为你让所有人都显得像废物。',
              shortDesc: '"别废话了，开干！"',
              attributes: {
                     摸鱼指数: 0,
                     暴躁值: 30,
                     干饭能力: 50,
                     卷度: 95
              },
              color: '#4CAF50',
              image: '/horses/zhanma.jpg'
       },
       {
              id: 'aimashi',
              name: '爱马仕',
              description: '朋友圈是岁月静好的精致生活，现实是月光族的精致穷鬼。梦里背着爱马仕走红毯，醒来骑着爱玛电动车挤早高峰，冷风打在脸上还要保持微笑。花呗账单比工资条长，但姐妹聚会绝不能掉面子。',
              shortDesc: '"虽然穷，但要穷得精致"',
              attributes: {
                     摸鱼指数: 55,
                     暴躁值: 25,
                     干饭能力: 65,
                     卷度: 45
              },
              color: '#E91E63',
              image: '/horses/aimashi.jpg'
       },
       {
              id: 'shoukuanma',
              name: '收款马',
              description: '每个月只有发工资那天眼睛是亮的，余额到账那一刻是你全年精神状态的巅峰。你上班不是为了梦想，不是为了成长，就是为了那个到账提醒音。"叮"——这一声就是活下去的理由。',
              shortDesc: '"工资到了！爷又活过来了"',
              attributes: {
                     摸鱼指数: 50,
                     暴躁值: 10,
                     干饭能力: 80,
                     卷度: 60
              },
              color: '#4CAF50',
              image: '/horses/shoukuanma.jpg'
       },
       {
              id: 'makalong',
              name: '马卡笼',
              description: '运气差到系统都看不下去。别人做项目顺风顺水，你做项目次次翻车。服务器只在你值班的时候崩，客户只在你对接的时候炸，领导只在你摸鱼的时候巡查。你不是倒霉，你是被霉选中的人。',
              shortDesc: '"完了，我又踩坑了"',
              attributes: {
                     摸鱼指数: 40,
                     暴躁值: 60,
                     干饭能力: 50,
                     卷度: 50
              },
              color: '#FF9800',
              image: '/horses/makalong.jpg'
       },
       {
              id: 'qianlima',
              name: '千里马',
              description: '你跑得确实够远的——离家两千公里，月薪五千。过年抢票像打仗，七天假期五天在路上。视频里跟爸妈说"挺好的"，挂了电话看着出租屋天花板发呆。伯乐没找到，倒是把自己跑丢了。',
              shortDesc: '"家在远方，我也在远方"',
              attributes: {
                     摸鱼指数: 45,
                     暴躁值: 35,
                     干饭能力: 55,
                     卷度: 55
              },
              color: '#3F51B5',
              image: '/horses/qianlima.jpg'
       },
       {
              id: 'hema',
              name: '河马',
              description: '你来公司就干三件事：吃、睡、等下班。工位是你的第二张床，午休闹钟是你最大的仇人。一天精力就那么多，全用在找舒服的姿势上了。别人说你躺平，你觉得自己只是节能模式。',
              shortDesc: '"别叫醒我，叫不醒的"',
              attributes: {
                     摸鱼指数: 85,
                     暴躁值: 5,
                     干饭能力: 90,
                     卷度: 0
              },
              color: '#607D8B',
              image: '/horses/hema.jpg'
       },
       {
              id: 'banma',
              name: '搬马',
              description: '你的工作内容是：以上所有。修打印机是你，搬桌子是你，接待客户是你，取快递也是你。简历上写"综合岗"，实际上是"什么都干岗"。你不是员工，你是公司的瑞士军刀，便宜又好用。',
              shortDesc: '"这个也归我管？行吧..."',
              attributes: {
                     摸鱼指数: 20,
                     暴躁值: 45,
                     干饭能力: 60,
                     卷度: 70
              },
              color: '#795548',
              image: '/horses/banma.jpg'
       },
       {
              id: 'shamate',
              name: '傻马特',
              description: '你最强的技能是点头。领导讲话你点头，同事抱怨你点头，甲方提需求你还是点头。"嗯嗯""对对对""你说得对"三件套绝不离身。别人以为你好说话，其实你压根没在听，灵魂早已离开会议室。',
              shortDesc: '"嗯嗯嗯，对对对，你说的都对"',
              attributes: {
                     摸鱼指数: 80,
                     暴躁值: 15,
                     干饭能力: 55,
                     卷度: 10
              },
              color: '#9E9E9E',
              image: '/horses/shamate.jpg'
       },
       {
              id: 'elema',
              name: '饿了马',
              description: '早上想午饭，午饭想下午茶，下午想晚饭，晚上想夜宵。工位抽屉打开像开了个小卖部，嘴巴就没停过。工作群消息可以不看，但美食群消息秒回。你来公司上班是假的，你来公司干饭才是真的。',
              shortDesc: '"先别说了，今天中午吃啥？"',
              attributes: {
                     摸鱼指数: 60,
                     暴躁值: 20,
                     干饭能力: 100,
                     卷度: 25
              },
              color: '#FF5722',
              image: '/horses/elema.jpg'
       }
];
