export function Button({ asChild, children, className, variant, ...rest }){
  const cls = "btn " + (variant==="outline" ? "outline" : "primary") + " " + (className||"");
  if(asChild && children && children.type === 'a'){ 
    return React.cloneElement(children, { className: (children.props.className||"") + " " + cls });
  }
  return <button className={cls} {...rest}>{children}</button>;
}
