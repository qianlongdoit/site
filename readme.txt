主旨：用于记录制作过程中的一些问题与解决。

排版：1.前期没考虑到有2个隐藏/显示的模块其实是一样的，虽然后期经过修改
	解决了，但前期如果注意到会节省时间。
      2.使用icomoon字体图标。     
      3.CSS3做简单的动画。
      4.文字的切换显示，可以利用float，overflow:hidden固定高度隐藏
	再加上定时改变margin来简单实现，无需写复杂的JS；


JS：1.使用图片延迟加载技术。
	a.img的src="",对于图片地址固定的写入自定义属性data-src
	  中。图片要更新的用JS动态写入属性data-src=""中。
	b.获取这样的图片集合，滚动到适合距离时触发加载图片事件。
	c.加载图片事件：创建新img标签，该标签的src为data-src，图片加载完成后，
	  触发图片替换函数，将页面中图片进行替换。
	细节问题:a.防止重复加载，引入了一个class来判断，加载添加，完成移除。
		 b.图片src=""后，会引起排版问题，造成页面布局打乱。
		   布局打乱造成浮动的$(obj).offset().top返回值为0，影响图片的
		   加载判读，即滚动就全部图片加载完成。
		   可以使用空白图片占位、也可以先获取图片宽高，给图片添加css
		 c.创建img标签后应该及时清除。
    2.图片轮播区域的按钮使用了事件委托；
	轮播，起初定时器自增索引并切换图片与点击切换图片互为独立。
	->造成运动过程中快速点击出现图片单张切换，但是对应的span标签点亮多个
	->想设置鼠标点击间隔，发现不合适
	->最后发现正确的思路是，定时器写入点击事件内部，鼠标点击时清除定时器、
	改变index，最后传入index呈现相应的变化，然后延时重开定时器。
	->如此，算是解决了快速点击运动不协调的问题。
	