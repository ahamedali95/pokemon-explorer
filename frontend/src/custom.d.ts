declare module '*.svg' {
    const content: string;
    export default content;
}

declare module '*.png' {
    const content: string;
    export default content;
}

//modules aliased with Webpack

declare module '@types' {
    import { ButtonProps } from '@types';
    import { FlexContainerProps } from '@types';
    import { PaginationProps } from '@types';
    import { SelectProps } from '@types';
    import { TextFieldProps } from '@types';
    import { ToastNotificationProps } from '@types';

    export { ButtonProps, FlexContainerProps, PaginationProps, SelectProps, TextFieldProps, ToastNotificationProps };
}

declare module '@components/forms' {
    import { ButtonProps } from '@types';
    import { TextFieldProps } from '@components/forms/TextField';
    import { SelectProps } from '@components/forms/TextField';
    import { FlexContainerProps } from '@components/forms/FlexContainer';

    const Button: React.FC<ButtonProps>;
    const TextField: React.FC<TextFieldProps>;
    const Select: React.FC<SelectProps>;
    const FlexContainer: React.FC<FlexContainerProps>;
    const Pagination: React.FC;

    export { Button, TextField, Select, FlexContainer, Pagination };
}

declare module '@components/notifications' {
    import { ToastNotificationProps } from '@components/notifications/ToastNotification';

    const ToastNotification: React.FC<ToastNotificationProps>;

    export { ToastNotification };
}


declare module '@components/routing/Route' {
    const Route: React.FC;

    export default Route;
}

declare module '@hooks' {
    const usePokemonFilter: CallableFunction;
    const useToastNotification: CallableFunction;
    const usePagination: CallableFunction;

    export { usePokemonFilter, useToastNotification, usePagination };
}

declare module '@api/queries' {
    import { DocumentNode } from 'graphql/language/ast';
    const pokemons: DocumentNode;
    const pokemonTypes: DocumentNode;
    const pokemonByName: DocumentNode;

    export { pokemons, pokemonTypes, pokemonByName };
}


declare module '@api/mutations' {
    import { DocumentNode } from 'graphql/language/ast';
    const favoritePokemon: DocumentNode;
    const unFavoritePokemon: DocumentNode;

    export { favoritePokemon, unFavoritePokemon };
}