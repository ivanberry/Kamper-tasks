## z-index--堆叠上下文之我见:smile:

### 堆叠上下文是什么？:boom:

堆叠上下文是HTML文档中可视性质中的一个三维概念，沿着`z-axis`轴线布置，越靠近用户为正值越大。背景交代完毕后，我们来说点正事：
怎么能形成堆叠上下文呢？这是一个值得思考的问题：

堆叠上下文形成：

- 根元素(root)
- `position`定位(absolute, relative),并设置有`z-index`不为`auto`
- `flex`元素，设置不为`auto`的`z-index`值(父类元素有`display: flex`)
- `opacity`值小于1
- `transform`不为`none`
- `mix-blend-mode`不为`normal`
- `filter`不为`none`
- `perspective`不为`none`
- `isolation`值设置为`isolate`
- `position: fixed`
- 上述值通过`will-change`设定（这个属性我不认识，之后添加附录学习)
- `-webkit-overflow-scrolling: touch`

堆叠上下文，对于子元素而言，只对父元素有存在意义，也就是说同一父元素的子元素堆叠上下文的不同才有视觉的意义，在父元素上下文中，子元素的堆叠上下文是一样的，其实在根元素下也是一个概念而已。

### 总结:boom:

- 元素通过`position`定位，并设置`z-index`值或者设置`opacity`小于1
- 堆叠上下文能继承
- 兄弟元素之间的堆叠上下文是独立的
- 堆叠上下是自封闭的

这个时候需要开个视觉冲击：

![堆叠上下文视觉展现](./stack-context.png)

- Root

    - DIV#1

    - DIV#2

    - DIV#3

        - DIV#4

        - DIV#5

        - DIV#6

可能对图片上的，或者文字的描述会不那么清晰，我们在说一下父元素堆叠上下文建立后，子元素的情况：

- Root
    
    - DIV#2- z-index: 2

    - DIV#2- z-index: 4 

        - DIV#5 z-index： 4.1

        - DIV#5 z-index： 4.3

        - DIV#5 z-index： 4.6

    - DIV#1- z-index: 5 


```html

<div id="div1">
      <h1>Division Element #1</h1>
      <code>position: relative;<br/>
      z-index: 5;</code>
    </div>

    <div id="div2">
      <h1>Division Element #2</h1>
      <code>position: relative;<br/>
      z-index: 2;</code>
    </div>

    <div id="div3">

      <div id="div4">
        <h1>Division Element #4</h1>
        <code>position: relative;<br/>
        z-index: 6;</code>
      </div>

      <h1>Division Element #3</h1>
      <code>position: absolute;<br/>
      z-index: 4;</code>

      <div id="div5">
        <h1>Division Element #5</h1>
        <code>position: relative;<br/>
        z-index: 1;</code>
      </div>
   
      <div id="div6">
        <h1>Division Element #6</h1>
        <code>position: absolute;<br/>
        z-index: 3;</code>
      </div>
    </div>

```

```css

* {
    margin: 0;
}
html {
    padding: 20px;
    font: 12px/20px Arial, sans-serif;
}
div {
    opacity: 0.7;
    position: relative;
}
h1 {
    font: inherit;
    font-weight: bold;
}
#div1,
#div2 {
    border: 1px dashed #696;
    padding: 10px;
    background-color: #cfc;
}
#div1 {
    z-index: 5;
    margin-bottom: 190px;
}
#div2 {
    z-index: 2;
}
#div3 {
    z-index: 4;
    opacity: 1;
    position: absolute;
    top: 40px;
    left: 180px;
    width: 330px;
    border: 1px dashed #900;
    background-color: #fdd;
    padding: 40px 20px 20px;
}
#div4,
#div5 {
    border: 1px dashed #996;
    background-color: #ffc;
}
#div4 {
    z-index: 6;
    margin-bottom: 15px;
    padding: 25px 10px 5px;
}
#div5 {
    z-index: 1;
    margin-top: 15px;
    padding: 5px 10px;
}
#div6 {
    z-index: 3;
    position: absolute;
    top: 20px;
    left: 180px;
    width: 150px;
    height: 125px;
    border: 1px dashed #009;
    padding-top: 125px;
    background-color: #ddf;
    text-align: center;
}

```

