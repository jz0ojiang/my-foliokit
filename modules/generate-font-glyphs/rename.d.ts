declare module 'gulp-rename' {
  interface RenameOptions {
    dirname?: string;
    basename?: string;
    prefix?: string;
    suffix?: string;
    extname?: string;
  }

  function rename(options: RenameOptions | string): NodeJS.ReadWriteStream;

  export = rename;
}