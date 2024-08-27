import classNames from 'classnames';
import React from 'react';

interface H1Props {
    id:string
    message: string;
    className:string
}

const H1: React.FC<H1Props> = (H1Prop) => {
    return (
        <div className="container mx-auto pt-4">
        <div className="p-2 sm:p-4">
          <h1 id={H1Prop.id} className={`text-4xl font-bold bg-gradient-to-r from-blue-500 to-green-500 bg-clip-text text-transparent pt-6 ${classNames}`}>
            {H1Prop.message}
          </h1>
        </div>
      </div>
    );
};

export default H1;
